const { Script } = require("vm");

module.exports = {
    apps: [
        {
            name: "task vibe",
            Script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "developement",
            },
        },
    ],
};