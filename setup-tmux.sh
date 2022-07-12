tmux new-session \; \
  send-keys 'docker-compose up' \;\
  split-window -v\; \
  send-keys 'docker exec -it backend ./manage.py test' \; \
  split-window -h \; \
  send-keys 'docker exec -it frontend npm run test'\; \
