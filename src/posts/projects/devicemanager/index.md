---
title: Device Manager
date: '2020-03-20'
tags: ["project", "lab", "nsu", "iae", "education"]
---

## What is it?

Device Manager is a set of software components that helps to abstract devices for [Circle Laser Writing System](/clws).
I was doing this project in laboratory of diffractive optics at [IA&E SB RAS](https://www.iae.nsk.su/en/) as part of my education at [NSU](https://www.nsu.ru/).
I have fantastic time here learning system-level programming and I produced amazing work that is still used.
Most of user interfaces I implemented are used without major changes.

## Architecture

Device Manager consists from:
* SDK to implement devices in C++
* Core module that loads device libraries and manages their configurations
* TCP server with custom command-based protocol for remote control and configuration
* UI client implemented in C#

## Features

Device Manager is very useful :)
* It allows multiple configurations of virtual devices (aka virtual machines). The whole [CLWS](/clws) is represented as single virtual device with multiple device interfaces that can be linked to interfaces of real or software-emulated devices
* It can load and apply configurations at runtime without recompiling control program

## Device Manager Screenshots

![Device Manager](./img1.jpg "Screen 1")

![Device Manager](./img2.jpg "Screen 2")

![Device Manager](./img3.jpg "Screen 3")

![Device Manager](./img4.jpg "Screen 4")

![Device Manager](./img5.jpg "Screen 5")

![Device Manager](./img6.jpg "Screen 6")

![Device Manager](./img7.jpg "Screen 7")
