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
