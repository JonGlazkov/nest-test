
up: 
	docker compose up -d --build 

down: 
	docker compose -p supermega stop

clean: 
	docker compose -p supermega down --rmi local -v --remove-orphans 