SUBDIRS = web socket.io node.js modern titanium phonegap sencha webos

.PHONY: all
all:
	for dir in $(SUBDIRS); do \
    	$(MAKE) -C $$dir || exit 1 ;     \
	done

.PHONY: clean
clean:
	for dir in $(SUBDIRS); do \
		$(MAKE) clean -C $$dir || exit 1 ; \
	done 

.PHONY: test
test:
	for dir in $(SUBDIRS); do \
		$(MAKE) test -C $$dir || exit 1 ; \
	done 
