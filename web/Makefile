include ../Makefile.inc
VERSION=3.4.2
TOPOUT=pubnub-$(VERSION).js
MINOUT=pubnub-$(VERSION).min.js
JSON_JS=$(CORE_DIR)/json.js
CORE_JS=$(CORE_DIR)/pubnub.js
WEBSOCKET_JS=$(CORE_DIR)/websocket.js
PUBNUB_JS=pubnub.js
PUBNUB_MIN_JS=pubnub.min.js
OUTPUT_FILES=$(TOPOUT) $(MINOUT) $(PUBNUB_JS) $(PUBNUB_MIN_JS)

.PHONY	: all
all: build

.PHONY	: build
build: $(PUBNUB_JS) $(PUBNUB_MIN_JS)

$(TOPOUT) : $(JSON_JS) $(CORE_JS) $(WEBSOCKET_JS)
	echo $(ECHO)
	$(ECHO) -n "// " > $(TOPOUT)
	$(ECHO) $(VERSION) >> $(TOPOUT)
	cat $(JSON_JS) $(CORE_JS) $(WEBSOCKET_JS) >> $(TOPOUT)

$(MINOUT) : $(TOPOUT)
	$(ECHO) -n "// " >> $(MINOUT)
	$(ECHO) $(VERSION) >> $(MINOUT)
	$(ECHO) "(function(){" >> $(MINOUT)
	java -jar $(GOOGLE_MINIFY) --js=$(TOPOUT) --compilation_level=ADVANCED_OPTIMIZATIONS >> $(MINOUT)
	$(ECHO) "})();" >> $(MINOUT)

$(PUBNUB_JS) : $(TOPOUT)
	cp $(TOPOUT) $(PUBNUB_JS)

$(PUBNUB_MIN_JS): $(MINOUT)
	cp $(MINOUT) $(PUBNUB_MIN_JS)

.PHONY	: clean
clean:
	rm -f $(OUTPUT_FILES)
