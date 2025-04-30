# README
Right now this is just a website in which to personally tinker with.

## Install System Dependencies
Install postgres and redis (Arch Linux):
    pacman -S postgresql redis

Install [rbenv](https://github.com/rbenv/rbenv):
    git clone https://github.com/rbenv/rbenv.git ~/.rbenv
    ~/.rbenv/bin/rbenv init

Install [ruby-build plugin for rbenv](https://github.com/rbenv/ruby-build):
    git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

Install [rbenv-vars plugin for rbenv](https://github.com/rbenv/rbenv-vars):
    git clone https://github.com/rbenv/rbenv-vars.git "$(rbenv root)"/plugins/rbenv-vars

Install the needed version of Ruby (from within project directory):
    rbenv install

## Configuration
Set up postgres and the developement user with ability to create databases.
    username: personal_website
    password: password

Create the .rbenv_vars file and populate any needed environment variables:
    cp .rbenv_vars.example .rbenv_vars

## Run Local Server
    bundle exec bin/dev

## Run Tests
    bundle exec rspec

## Run Linters
    bundle exec rubocop
    bundle exec haml-lint
