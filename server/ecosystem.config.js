const { Script } = require("vm");

module.exports = {
    apps: [
        {
            name: "TaskVibe",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "developement",
            },
        },
    ],
}