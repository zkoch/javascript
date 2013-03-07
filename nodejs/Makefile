include ../Makefile.inc

PUBNUB_COMMON_JS=$(CORE_DIR)/pubnub-common.js
PUBNUB_NODE_JS=$(VERSION)/pubnub-$(VERSION).js
PUBNUB_JS=pubnub-$(VERSION).js

OUTPUT_FILES=$(PUBNUB_JS)




.PHONY	: all
all: build

.PHONY	: build
build: $(PUBNUB_JS)



$(PUBNUB_JS): $(PUBNUB_COMMON_JS) $(PUBNUB_NODE_JS)
	cat $(PUBNUB_COMMON_JS) $(PUBNUB_NODE_JS) > $(PUBNUB_JS)

.PHONY	: clean
clean:
	rm -f $(OUTPUT_FILES) 

.PHONY	: test
test:
	mocha -R spec $(VERSION)/tests/test.js
