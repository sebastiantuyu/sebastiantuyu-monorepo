<template>
  <client-only>
    <div>
      <button @click="addImage">
          setImage
      </button>
      <button @click="save">
        Guardar
      </button>
      <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
          bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
          italic
        </button>
        <button
          @click="editor.commands.toggleHeading({ level: 1 })"
        >
          H1
        </button>

        <button
          @click="editor.commands.toggleHeading({ level: 2 })"
        >
          H2
        </button>

        <button
          @click="editor.commands.toggleBulletList()"
        >
          list
        </button>



        <button @click="toggleHeading" :class="{ 'is-active': editor.isActive('strike') }">
          abstract
        </button>

        <button @click="pasteHTML" :class="{ 'is-active': editor.isActive('strike') }">
          paste HTML
        </button>
        <!-- <button @click="makeWarning" :class="{ 'is-active': editor.isActive('strike') }">
          warning
        </button> -->
      </bubble-menu>
    <editor-content :editor="editor" />
    <link rel="stylesheet" href="https://latex.now.sh/style.css">
    </div>
  </client-only>
</template>

<script src="./Editor.ts" lang="ts"></script>
<style src="./Editor.scss" lang="scss"></style>
