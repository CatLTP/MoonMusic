@Library('jenkin-shared-libraries')

import notification.mattermostBot

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
                - name: kubectl
                  image: bitnami/kubectl:latest
                  command:
                  - "/bin/sh"
                  - "-c"
                  - "sleep 99d"
                  tty: true
                  securityContext:
                    runAsUser: 0
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

        /*stage('Deploy in Kubernetes') {
            steps {
                sh "echo Deploying ${DOCKER_IMAGE} to the dev environment"
                	
                script {
                    container('kubectl') {
			withCredentials([file(credentialsId: 'minikube_config',variable: 'KUBECONFIG')]) {
                    		sh "echo $KUBECONFIG > /.kube/config"
                                sh "kubectl config set-context minikube --cluster=minikube --user=minikube"
                                sh "kubectl config use-context minikube" 
				sh "kubectl --insecure-skip-tls-verify=true apply -f deployment.yaml"
			}
                    }
                }
            }
        }*/

	stage('Notificate Mattermost') {
            steps {
                sh "echo Sending hello to Mattermost"
                        
                script {
			mattermostBot('xk9zg5wnatn9xqncy6xdpq1o9c','sjp1jxam6fg83cz75oh56gexsh','Hello from Jenkin')
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
