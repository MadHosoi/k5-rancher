# Guide

docker-compose up -d

fly -t lite set-pipeline -p hello-world -c helloworld.yml

fly -t k5-main login -c http://185.170.26.160:8081

fly -t k5-cnets login -c http://185.170.26.160:8081 -n cnets

fly set-pipeline --target k5-cnets --config main-pipeline.yml --pipeline k5-swift-to-cf --non-interactive --load-vars-from main-properties.yml

#Resources

https://github.com/starkandwayne/concourse-tutorial

# Hello world task, pipeline & github integration

fly -t k5-cnets set-pipeline -p helloworld-pipeline -c pipelines/helloworld-pipeline.yml

If some changes occurs in the repository, the pipeline launch a new cycle..

Then, i will link the message of a file in Github to task & slack
