pipeline {
    agent {
        kubernetes {
            yaml '''
            apiVersion: v1
            kind: Pod
            spec:
                containers:
                - name: docker
                  image: docker:latest
                  command:
                  - cat
                  tty: true
                  volumeMounts:
                  - mountPath: /var/run/docker.sock
                    name: docker-sock
                volumes:
                - name: docker-sock
                  hostPath:
                    path: /var/run/docker.sock    
            '''
        }
    }

    environment {
        // Define any necessary environment variables here
        APP_NAME = 'moon-music'
        DOCKER_IMAGE = 'phuongcat02/moon-music'
    }

    stages {
        /*stage('Docker Build') {
            steps {
                script {
                    container('docker') {
                        def imageTag = "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
                        def image = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")

                        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dockerhubPassword', usernameVariable: 'dockerhubUser')]) {
                            sh "docker login -u ${env.dockerhubUser} -p ${env.dockerhubPassword}"
                            sh "docker push ${imageTag}"
                        }
                        env.IMAGE_TAG = imageTag
                    }
                }
            }
        }*/

        stage('Deploy in Kubernetes') {
            steps {
                sh "echo Deploying ${DOCKER_IMAGE} to the dev environment"
                
		script {
			container('kubectl') {
				withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: 'minikube', credentialsId: 'minikube-jenkins-secret', namespace: 'jenkins', restrictKubeConfigAccess: false, serverUrl: 'https://192.168.49.2:8443') {
                        		sh "kubectl get pod"
                		}
			}
		}
             
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
