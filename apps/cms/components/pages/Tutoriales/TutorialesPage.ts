import Vue from 'vue';
import Editor from '~/components/editor/Editor';
import PageWrapper from '~/components/PageWrapper/PageWrapper';

export default Vue.extend({
    components: {
        Editor,
        PageWrapper
    },
    data() {
        return {
            isLoading: true,
            products: [],
            target: '',
            suid: '',
            title: '',
            titleContent: '',
            data: {
                gist: '',
                img: '',
            },
            separator: document.createElement('p')
                .appendChild(document.createElement('br')),
        }
    },
    setup() {

    },
    methods: {
        $refs: {},
        playAnimation(el: any) {
            console.log(el);
            if (el.nodeType === Node.TEXT_NODE) {
            el = el.parentNode;
            }
        
            el.classList.remove("highlight");
            setTimeout(() => {
            el.classList.add("highlight");
            }, 0);
        },
        setEndOfContenteditable() {
            var range,selection: any;
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(this.$refs.genericEditor);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        },
        set(type: string) {
            const e = document.createElement(type);
            e.innerText = "Type";
            this.$refs.genericEditor.appendChild(e);
            this.$refs.genericEditor.appendChild(this.separator);
        },
        addTabSpaces(e: any) {
            e.preventDefault();
            console.log(window.getSelection());
            this.$refs.genericEditor.innerHTML += "&nbsp";
            this.$refs.genericEditor.innerHTML = this.$refs.genericEditor.innerHTML;
            this.$refs.genericEditor.focus();
        },
        onMouseDown(e: any) {
            // const selection = window.getSelection();
            // if (!selection) return;

            // const range = selection.getRangeAt(0);
  
            // // Create two new span elements
            // const span1 = document.createElement("strong");
            // const span2 = document.createElement("span");
          
            // // Set the text content of each span element
            // span1.textContent = range.toString();
            // // span2.textContent = text.textContent.slice(range.endOffset);
          
            // // Replace the selected text with the new span elements
            // range.deleteContents();
            // range.insertNode(span1);
            // range.insertNode(span2);

            // if (selection.type === "Range") {
            //     for (let i = 0; i < selection.rangeCount; i++) {
            //     const range = selection.getRangeAt(i);
            //     this.playAnimation(range.commonAncestorContainer);
            //     }
            // }

            // let range = selection.getRangeAt(0);
            // // console.log(range.commonAncestorContainer);
            // // //@ts-ignore
            // let selectedNodes = range.commonAncestorContainer;
            // for (let i = 0; i < selectedNodes; i++) {
            //   let node = selectedNodes[i];
            //   if (range.intersectsNode(node)) {
            //     node.classList.add('dummy');
            //   }
            // }
          
        },
        changeTitle(event: InputEvent) {
            //@ts-ignore
            console.log(event.target.value);
            // if(event.target.value.startsWith("/")) {
            //     console.log(event.target.value)
            // }
        },
        insertImage() {
            if (this.data.img === "") return;
            const image = new Image();
            image.src = this.data.img;
            
            this.$refs.genericEditor.appendChild(this.separator);
            this.$refs.genericEditor.appendChild(image)
            image.onload = () => {
                this.$refs.genericEditor.appendChild(this.separator);
                this.data.img = "";
            };
            this.setEndOfContenteditable();
        },
        insertGists() {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://gist.github.com/7544705.js';
            /* Backup document.write function */
            //@ts-ignore
            if(!document._write) document._write = document.write;
            /* Override document.write function */
            document.write = function (str) {
                //@ts-ignore    
                document.getElementById('editor-plain').innerHTML += str;
            };
            /* Append the script element to #scriptCont */
            const d = document.getElementById('editor-plain');
            
            //@ts-ignore
            d.appendChild(script);
            
            /* When the script load, restore the document.write function */
            script.onload = function () { 
                setTimeout(function(){
                    //@ts-ignore
                    document.write = document._write;
                    const separator = document.createElement('p');
                    separator.innerHTML = '<br>';
                    //@ts-ignore
                    d.appendChild(separator);
                },0);
            };
        },
        pasteOnEditor(e: any) {
            console.log(e);
                    // cancel paste
            e.preventDefault();

            // get text representation of clipboard
            var text = (e.originalEvent || e).clipboardData.getData('text/plain');

            // insert text manually
            document.execCommand("insertHTML", false, text);
        }
        // async save(content: string) {
        //     console.log(
        //         this.suid,
        //         this.title,
        //         content
        //     );
        //     const ok = await APIService.saveResume.bind(this)({
        //         title: this.title,
        //         suid: this.suid,
        //         content
        //     });
        //     if(ok) {
        //         window.alert('Resumen agregado correctamente');
        //         window.location.reload();
        //     } else {
        //         window.alert('Falló, probablemente ya existe este resumen.');
        //     }
        // }
    }
})
