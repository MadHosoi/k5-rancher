# Guide

docker-compose up -d

fly -t lite set-pipeline -p hello-world -c helloworld.yml
#Resources

https://github.com/starkandwayne/concourse-tutorial

# Hello world task, pipeline & github integration

fly -t k5-cnets set-pipeline -p helloworld-pipeline -c pipelines/helloworld-pipeline.yml