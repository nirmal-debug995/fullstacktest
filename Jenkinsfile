pipeline {
    agent any

    tools {
        nodejs "node 25"
    }

    environment {
        PORT = "3000"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/nirmal-debug995/fullstacktest.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Stop Old App') {
            steps {
                // Stop pm2 process if already running
                sh 'pm2 delete chat-app || true'
            }
        }

        stage('Run App') {
            steps {
                // Start the app using pm2
                sh 'pm2 start app.js --name chat-app --update-env'
                sh 'pm2 save'
            }
        }
    }

    post {
        always {
            // Show pm2 status for debugging
            sh 'pm2 status'
        }
    }
}
