# Covid Control

Covid Control is an all-in-one solution for controlling mask usage in stores.

## Features

Covid Control detects whether customers are wearing a mask. It consists of a wireless camera system which sends a video feed to a server that performs mask detection. Data is stored, processed, and is made available for users to view on the business dashboard web app.

The wireless camera system is built on a Raspberry Pi Zero W with imagezmq which sends frames to the server. The server runs a mask detection model with Keras and OpenCV to detect whether people in frame are wearing masks or not. This data is processed by a Python Flask server and sent to the React web application.

## Video Demonstration
<https://www.youtube.com/watch?v=9mKOeMvQPn4>

## Background

Covid Control was created for STEMComp 2020 as a submission for the technology category in June 2020.

## Usage

In order to use Covid Control, setup the three components:
- Raspberry Pi
- Server
- Front end

### Raspberry Pi
For Raspberry Pi, navigate to the back-end folder and find client.py. Install dependencies.

```
pip install imagezmq
pip install imutils
```

You may need more depending on the system. Install those as well.

Then, start the client with the ip of the server.

```
python client.py --server-ip <your ip>
```

### Server
For mask detection, navigate to the back-end folder and find mask_detection.py. Install dependencies.
```
pip install tensorflow
pip install opencv-python
pip install matplotlib
pip install imagezmq
```
You may need more depending on the system. Install those as well.

Start the server.

```
python mask_detection.py
```

For the Flask server, find server.py. Install dependencies.

```
pip install flask
```

You may want to adjust the port. Change the port argument to your desired port.

```python
app.run(port=5000)
```

Start the server.
```
python server.py
```

### Dashboard
For the dashboard, navigate to the front-end folder. Install dependencies.
```
npm install
```

Make sure the API calls are to the right addresses. Start the app.
```
npm start
```

## Contributors
Matthews Ma

Samer Rustum

## Sources
Prajna Bhandary for the dataset: <https://www.linkedin.com/feed/update/urn%3Ali%3Aactivity%3A6655711815361761280/>

PyImageSearch for help with mask detection: <https://www.pyimagesearch.com/2020/05/04/covid-19-face-mask-detector-with-opencv-keras-tensorflow-and-deep-learning/>

ImageZMQ for assistance in sending frames over the internet: <https://github.com/jeffbass/imagezmq>
