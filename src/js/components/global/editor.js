import {basicSetup} from "codemirror"
import {EditorView, keymap} from "@codemirror/view"
import {EditorState} from "@codemirror/state"
import {indentWithTab} from "@codemirror/commands"

var codeArea = document.getElementById("codeToExecute")

const minHeightEditor = EditorView.theme({
    ".cm-content, .cm-gutter": {minHeight: "200px"}
})

/**
 * O objeto do editor de código do CodeMirror na fase.
 * @constant {EditorView}
 */
export const editor = new EditorView({
    extensions: [basicSetup, minHeightEditor,keymap.of([indentWithTab])],
    parent: codeArea,
})
/**
 * Um estado de editor do Codemirror configurado para somente leitura.
 * @constant {EditorState}
 */
export const readOnlyState = EditorState.create({
    extensions:[basicSetup,EditorView.editable.of(false)]
})