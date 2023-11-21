start: format
	@npm run start

build: format
	@npm run build

format:
	@npm run format

setup:
	@npm install
	@python3.11 -m pip install -r requirements.txt

generate: python_format
	@python3.11 main.py \
	&& $(MAKE) build \
	&& source main.sh

python_format:
	@isort . && black . && ruff .
