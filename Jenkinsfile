pipeline {
	agent any
	stages {
    
			stage('Git Checkout') {
				steps {
				git branch: 'main', url: 'https://github.com/BritoOs/ACS_Proyecto.git'
				}
			}
		
			stage('UNIT Testing') {
				steps {
					sh 'mvn test'
				}
    			}
			
			stage('Integracion Testing') {
				steps {
					sh 'mvn verify -DskipUnistTests'
				}
    			}
	}
}
