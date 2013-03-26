include ../Makefile.inc
PUBNUB_JS=pubnub.js
PUBNUB_WEB_JS=pubnub-web.js
PUBNUB_MIN_JS=pubnub.min.js
PUBNUB_CRYPTO_MIN_JS=pubnub-crypto.min.js
JSON_JS=$(CORE_DIR)/json.js
COMMON_JS=$(CORE_DIR)/pubnub-common.js
WEBSOCKET_JS=$(CORE_DIR)/websocket.js
PUBNUB_JS=pubnub.js
PUBNUB_MIN_JS=pubnub.min.js
GIBBERISH_JS=$(CORE_DIR)/crypto/gibberish-aes.js
ENCRYPT_JS=$(CORE_DIR)/crypto/encrypt-pubnub.js
OUTPUT_FILES=$(PUBNUB_JS) $(PUBNUB_MIN_JS) $(PUBNUB_CRYPTO_MIN_JS)

.PHONY	: all
all: build

.PHONY	: build
build: $(PUBNUB_JS) $(PUBNUB_MIN_JS) $(PUBNUB_CRYPTO_MIN_JS)

$(PUBNUB_JS) : $(JSON_JS) $(CORE_JS) $(WEBSOCKET_JS)
	echo $(ECHO)
	$(ECHO) -n "// " > $(PUBNUB_JS)
	$(ECHO) $(VERSION) >> $(PUBNUB_JS)
	cat $(JSON_JS) $(COMMON_JS) $(PUBNUB_WEB_JS) $(WEBSOCKET_JS) >> $(PUBNUB_JS)

$(PUBNUB_MIN_JS) : $(PUBNUB_JS)
	$(ECHO) -n "// " > $(PUBNUB_MIN_JS)
	$(ECHO) $(VERSION) >> $(PUBNUB_MIN_JS)
	$(ECHO) "(function(){" >> $(PUBNUB_MIN_JS)
	java -jar $(GOOGLE_MINIFY) --js=$(PUBNUB_JS) --compilation_level=ADVANCED_OPTIMIZATIONS >> $(PUBNUB_MIN_JS)
	$(ECHO) "})();" >> $(PUBNUB_MIN_JS)

$(PUBNUB_CRYPTO_MIN_JS) : $(GIBBERISH_JS) $(ENCRYPTO_JS)
	$(ECHO) "(function(){" >> $(PUBNUB_CRYPTO_MIN_JS)
	cat $(GIBBERISH_JS) $(ENCRYPT_JS) | java -jar $(GOOGLE_MINIFY) >> $(PUBNUB_CRYPTO_MIN_JS)
	$(ECHO) "})();" >> $(PUBNUB_CRYPTO_MIN_JS)


.PHONY	: clean
clean:
	rm -f $(OUTPUT_FILES)
