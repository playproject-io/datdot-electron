#!/usr/bin/env node
const child_process = require('child_process')
const command = './node_modules/.bin/electron'
const pipe = { stdio: 'inherit' }
const file = 'src/electron.js'
const flags = process.argv.slice(2)
const args = [file].concat(flags)
const child = child_process.spawn(command, args, pipe)
child.on('close', function (code) { process.exit(code) })
