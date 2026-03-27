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
                git branch: 'main',
                    url: 'git@github.com:nirmal-debug995/fullstacktest.git',
                    credentialsId: 'Gitrepo' // make sure this is your SSH credential in Jenkins
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Stop Old App') {
            steps {
                sh 'pm2 delete chat-app || true'
            }
        }

        stage('Run App') {
            steps {
                // Start the app using pm2 with a name
                sh 'pm2 start app.js --name chat-app'
                // Save the pm2 process list for auto-start on reboot
                sh 'pm2 save'
            }
        }

        stage('Check App') {
            steps {
                // Simple health check to verify the app responds
                sh 'curl -f http://localhost:3000 || exit 1'
            }
        }
    }

    post {
        always {
            echo 'Build finished.'
            sh 'pm2 status'
        }
    }
}
