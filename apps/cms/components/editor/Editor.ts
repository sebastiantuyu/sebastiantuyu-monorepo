import { Editor, EditorContent, BubbleMenu, mergeAttributes } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { Paragraph } from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';
import Vue from 'vue';

interface IProps {
  editor: Editor | null;
  content: string;
}

type Levels = 1 | 2 | 3;

const classes: Record<Levels, string> = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
}

let isAbstract = false;

const newP = Paragraph.configure({
  HTMLAttributes: {
    level: [1,2,3]
  }
}).extend({
  renderHTML({ node, HTMLAttributes }) {
    //const hasLevel = this.options.HTMLAttributes.levels.includes(node.attrs.level)
    //const level: Levels = hasLevel ? node.attrs.level : this.options.HTMLAttributes.levels[0]
    return [
      `p`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${isAbstract ? 'abstract': ''}`,
      }),
      0,
    ]
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands }: any) => {
        return commands.setNode('heading', {
          style: 'color: red',
        })
      },
    }
  }
})

export default Vue.extend({
  components: {
    EditorContent,
    BubbleMenu
  },
  data(): IProps { 
    return {
      editor: null,
      content: ""
    }
  },
  mounted() {
    (this as any).editor = new Editor({
      content: '<div class="abstract"><h2>Abstract</h2></div>',
      extensions: [
        StarterKit,
        Image,
        newP,
        Highlight.configure({
          multicolor: true,
        }),
        BulletList
      ],
    })
  },
  methods: {
    pasteHTML() {
      this.editor?.commands.insertContent('<script src="https://gist.github.com/defunkt/2059.js"></script>')
    },
    toggleHeading() {
      isAbstract = !isAbstract;
    },
    addImage() {
      const url = window.prompt('URL')
      
      if (url) {
        (this as any).editor.chain().focus().setImage({ src: url }).run()
      }
    },
    save() {
      const html: string = (this as any).editor.getHTML();
      this.$emit('save', html.replaceAll('"', '\''));
    }
  },
  beforeDestroy() {
    (this as any).editor.destroy()
  },
})
