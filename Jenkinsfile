pipeline {
    agent any

    environment {
        // Define any necessary environment variables here
        APP_NAME = 'moon-music'
        DOCKER_IMAGE = 'phuongcat02/moon-music'
    }

    stages {
	stage('Initialize'){
	    steps {
		script {
			def dockerHome = tool 'docker'
                	env.PATH = "${dockerHome}/bin:${env.PATH}"
			usermod -aG docker jenkins	
		}
	    }
	}

        
        stage('Docker Build') {
            steps {
		script {
			def imageTag = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
        	        sh "docker build -t ${imageTag} ."

                	withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dockerhubPassword', usernameVariable: 'dockerhubUser')]) {
                        sh "docker login -u ${env.dockerhubUser} -p ${env.dockerhubPassword}"
                        sh "docker push ${imageTag}"
                	}
			env.IMAGE_TAG = imageTag 
		}
            }
        }

        stage('Deploy') {
            steps {
            	sh "echo Deploying ${DOCKER_IMAGE} to the dev environment"
		
		sh """
                	kubectl set image deployment/moon-music moon-music=${env.IMAGE_TAG} -n dev
                """

		sh """
              		kubectl rollout status deployment/moon-music -n dev
            	"""
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
