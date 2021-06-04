#!/bin/bash

image=$( sudo docker images -q moviex )

if [[ -n "$image" ]]; then
  #stop all containers
  sudo docker stop $(sudo docker ps -aq)
  #remove all containers
  sudo docker rm $(sudo docker ps -aq)
  #remove images
  sudo docker rmi $(sudo docker images -q)
fi

sudo docker build . -t moviex
sudo docker run --rm -d --name next-moviex -p 3000:3000 moviex
