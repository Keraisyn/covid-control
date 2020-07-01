from imutils.video import VideoStream
import imagezmq
import argparse
import socket
import time

ap = argparse.ArgumentParser()
ap.add_argument("-s", "--server-ip", required=True)
args = vars(ap.parse_args())

sender = imagezmq.ImageSender(connect_to="tcp://{}:5555".format(args["server_ip"]))

rpiName = socket.gethostname()
vs = VideoStream(usePiCamera=True).start()

time.sleep(2.0)

while True:
	frame = vs.read()
	sender.send_image(rpiName, frame)
