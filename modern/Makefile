include ../Makefile.inc
PUBNUB_MODERN_JS=pubnub.js
PUBNUB_MIN_JS=pubnub.min.js
PUBNUB_CRYPTO_MIN_JS=pubnub-crypto.min.js
JSON_JS=$(CORE_DIR)/json.js
COMMON_JS=$(CORE_DIR)/pubnub-common.js
WEBSOCKET_JS=$(CORE_DIR)/websocket.js
PUBNUB_MIN_JS=pubnub.min.js
GIBBERISH_JS=$(CORE_DIR)/crypto/gibberish-aes.js
ENCRYPT_JS=$(CORE_DIR)/crypto/encrypt-pubnub.js
OUTPUT_FILES=$(PUBNUB_MIN_JS) $(PUBNUB_CRYPTO_MIN_JS)

.PHONY	: all
all: build

.PHONY	: build
build: $(PUBNUB_MIN_JS) $(PUBNUB_CRYPTO_MIN_JS)

$(PUBNUB_MIN_JS) : $(JSON_JS) $(COMMON_JS) $(PUBNUB_MODERN_JS)
	$(ECHO) -n "// " > $(PUBNUB_MIN_JS)
	$(ECHO) $(VERSION) >> $(PUBNUB_MIN_JS)
	$(ECHO) "(function(){" >> $(PUBNUB_MIN_JS)
	cat $(COMMON_JS) $(PUBNUB_MODERN_JS) | java -jar $(GOOGLE_MINIFY) --compilation_level=ADVANCED_OPTIMIZATIONS >> $(PUBNUB_MIN_JS)
	$(ECHO) "})();" >> $(PUBNUB_MIN_JS)

$(PUBNUB_CRYPTO_MIN_JS) : $(GIBBERISH_JS) $(ENCRYPTO_JS)
	$(ECHO) "(function(){" >> $(PUBNUB_CRYPTO_MIN_JS)
	cat $(GIBBERISH_JS) $(ENCRYPT_JS) | java -jar $(GOOGLE_MINIFY) >> $(PUBNUB_CRYPTO_MIN_JS)
	$(ECHO) "})();" >> $(PUBNUB_CRYPTO_MIN_JS)


.PHONY	: clean
clean:
	rm -f $(OUTPUT_FILES)
