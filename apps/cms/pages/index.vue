<template>
    <page-wrapper>
        <link rel="stylesheet" href="https://latex.now.sh/style.css">   
        <style>
            @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap');            
            * {
                font-family: 'IBM Plex Mono', monospace;
            }
            pre {
                position: relative;
            }

            pre p {
                margin: 0 !important;
            }

            pre cc {
                position: absolute;
                right: 15px;
                top: 15px;
                display: block;
                border: 1.5px solid #d3d3d3;
                padding: 5px 15px;
                border-radius: 6px;
            }
        </style>
        <div class="sdl--admin__title">
            Nuevo Post
        </div>

        <div class="sdl--admin__helper">
            <div class="sdl--admin__helper--row">
                <button
                    @click="$emit('save')"
                    class="btn-highlighted"
                    data-color="blue"
                >Save</button>
                <button
                    @click="$emit('saveAsDraft')"
                >Save as Draft</button>
            </div>
            <div class="sdl--admin__helper--row">
                <div class="input">
                <button
                    @click="insertGists"
                >Insert gist</button>
                    <input 
                        type="url" 
                        v-model="data.gist"
                        placeholder="https://gist.github.com/..."
                    >
                </div>
            
                <div class="input">
                    <button
                    @click="insertImage"
                >Insert img</button>
                    <input 
                        type="url" 
                        v-model="data.img"
                        placeholder="https://..."
                    >
                </div>
            </div>

            <div class="sdl--admin__helper--row input">
                <button @click="set('h1')">H1</button>
                <button @click="set('h2')">H2</button>
                <button @click="set('h3')">H3</button>
                <button @click="set('strong')">b</button>
                <button>i</button>
                <button>u</button>
                <button @click="set('pre')">
                    Code
                </button>
            </div>
        </div>

        <br>

        <!-- <div
            class="sdl--admin__metadata"
        >
            <input
            v-model="title"
            placeholder="title"
            type="text"
            name="siud"
            id=""
            >
            <input
                v-model="suid"
                placeholder="suid"
                type="text"
                name=""
                id=""
            >
        </div> -->
        
        <div 
            contenteditable="true" 
            @input="changeTitle"
            @paste="pasteOnEditor"
            id="editor-plain"
            ref="genericEditor"
            @keydown.tab="addTabSpaces"
        >
            <h1>
                Title
            </h1>

            <div class="abstract">
                <h2>ありがとうございます</h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic a assumenda, provident eius commodi iste sunt aspernatur quo eveniet distinctio quia dolorem necessitatibus animi consequuntur ea omnis maiores nulla voluptatum.
            </div>
            <p></p>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos repellendus sapiente eligendi quaerat, quidem saepe natus? Debitis ea explicabo asperiores. Molestias laboriosam, numquam quibusdam quisquam voluptates esse suscipit maiores eveniet.</div>
        </div>
        <!-- <Editor
            class="sdl-editor"
            @save="save"
        /> -->
    </page-wrapper>
</template>

<script src="~/components/pages/Tutoriales/TutorialesPage.ts" lang="ts"></script>
<style src="~/components/pages/Tutoriales/TutorialesPage.scss" lang="scss"></style> 
