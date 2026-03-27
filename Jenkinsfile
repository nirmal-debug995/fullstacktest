pipeline {
    agent any

    tools {
        nodejs "node 25" // must match the name in Jenkins Global Tool Config
    }

    environment {
        PORT = "3000"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                       url: 'git@github.com:nirmal-debug995/fullstacktest.git',
                        credentialsId: 'GIT_SSH_KEY_ID' // replace with your Jenkins SSH credential ID
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Stop Old App') {
            steps {
                sh 'pkill -f "node app.js" || true'
            }
        }

        stage('Run App') {
            steps {
                sh 'nohup npm start > app.log 2>&1 &'
            }
        }
    }
}
