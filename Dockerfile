from debian
maintainer Kevin Pennarun <kevin-pennarun.org>

# Update the package repository
RUN apt-get update; apt-get upgrade -y;

# Compiling and installing node.js
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y wget curl python g++ make checkinstall fakeroot && \
	src=$(mktemp -d) && cd $src && \
	wget -N http://nodejs.org/dist/node-latest.tar.gz && \
	tar xzvf node-latest.tar.gz && cd node-v* && \
	./configure && \
	fakeroot checkinstall -y --install=no --pkgversion $(echo $(pwd) | sed -n -re's/.+node-v(.+)$/\1/p') make -j$(($(nproc)+1)) install && \
	dpkg -i node_*


# Install Git
run apt-get install -y git

# Clone project
run git clone https://github.com/kepennar/feeds-proxy.git

# Install
run npm install bower -g
run cd feeds-proxy && npm install && bower install

# Expose the http port
expose 3000

workdir feeds-proxy

run NODE_ENV=production node app.js

