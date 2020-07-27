# DOCKER

### Based in [http://campus.codeschool.com/courses/try-docker/](http://campus.codeschool.com/courses/try-docker/)

## 1 - Containers & Images

### Running a Container

```
$ docker container run
$ docker container run httpd:2.4
```

### Mapping Ports 1

- To access localhost:80/index.html
- -p // For what?

```
$ docker container run -p 80:80 httpd:2.4
```

### Mapping Ports 1

The `-p` means "publish ports". The first number is the port on the host we want to open up, and the second number is the port in the container we want to map it to.

Port 80 is a standard port for handling web requests, but we could map any port on the host to the container. Let's try mapping 9999 on the host to 80 on the container.

```
$ docker container run -p 9999:80 httpd:2.4
```

### Accessing a Container

If we try to access `http://localhsot:80/index.html`, we'll get an error, but if we try to access `http://localhost:9999/index.html`, we'll see the default "It works" page.

To view about a container content, we can do this:

```
$ docker container ls
```

#### Executing commands in a container

```
$ docker container exec container_name `command`
```

### Attaching a Shell to a Container

```
$ docker container exec -it container_name /bin/bash
```

#### After this, its possible just run the commands directly to container

```
$ exec du -mh
```

### Installing Things in Containers

```
$ docker container exec -it elegant_noether /bin/bash
```

#### Example:

```
$ apt-get install -y fortunes
```

### Update the ENV in a Container

```
$ docker container exec -it elegant_noether /bin/bash.
$ PATH=$PATH:/usr/games/
$ export PATH
```

## 2 - Dockerfiles

See [Dockerfile](./Dockerfile)

### Building an imagem from a Dockerfile

```
$ docker image build --tag web-server:1.0 .
```

### Listing images

```
$ docker image ls
```

### Publishing a image from docker image

```
$ docker container run -p 80:80 web-server:1.0
```

## 3 - Volumes (The problem: Containers Don't Persist Data)

Our containers aren't doing much right now because we don't have a way to get
data in them.

### The solution: Data Volumes 

Data volumes expose files on your host machine to the container


