#!/bin/bash

sudo cp boom-server.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl boom-server start
