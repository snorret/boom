#!/bin/bash

sudo cp boom-server.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable boom-server.service
sudo systemctl boom-server start
