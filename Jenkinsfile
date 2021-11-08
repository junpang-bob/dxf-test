pipeline {
    agent any
    stages {
        stage('PushImages'){
          steps {
            echo '推送至阿里云'
          }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}