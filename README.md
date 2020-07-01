# Covid Control

Covid Control is an all-in-one solution for controlling mask usage in stores.

## Features

Covid Control detects whether customers are wearing a mask. It consists of a wireless camera system which sends a video feed to a server that performs mask detection. Data is stored, processed, and is made available for users to view on the business dashboard web app.

The wireless camera system is built on a Raspberry Pi Zero W with imagezmq which sends frames to the server. The server runs a mask detection model with Keras and OpenCV to detect whether people in frame are wearing masks or not. This data is processed by a Python Flask server and sent to the React web application.

## Background

Covid Control was created for STEMComp 2020 as a submission for the technology category in June 2020.

## Contributors
Matthews Ma

Samer Rustum

## Sources
https://www.pyimagesearch.com/2020/05/04/covid-19-face-mask-detector-with-opencv-keras-tensorflow-and-deep-learning/
https://github.com/jeffbass/imagezmq
