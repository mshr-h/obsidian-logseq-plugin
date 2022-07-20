import { Plugin, MarkdownRenderChild, MarkdownPostProcessorContext } from "obsidian";

export class Emoji extends MarkdownRenderChild {
	static ALL_EMOJIS: Record<string, string> = {
		":+1:": "👍",
		":sunglasses:": "😎",
		":smile:": "😄",
	};

	text: string;

	constructor(containerEl: HTMLElement, text: string) {
		super(containerEl);

		this.text = text;
	}

	onload() {
		const emojiEl = this.containerEl.createSpan({
			text: Emoji.ALL_EMOJIS[this.text] ?? this.text,
		});
		this.containerEl.replaceWith(emojiEl);
	}
}

function createCheckboxElement(checked: boolean): HTMLElement {
	const element = document.createElement("input");
	element.type = "checkbox";
	element.checked = checked;
	return element;
}

function EnhanceLogseqTaskStatusInPreviewMode(
	element : HTMLElement,
	context: MarkdownPostProcessorContext
) {
	const entries = element.querySelectorAll("li[data-line]");

	entries.forEach((entry) => {
		if (entry.innerHTML.startsWith("TODO ")) {
			entry.insertAdjacentElement(
				"afterbegin",
				createCheckboxElement(false)
			)
		} else if (entry.innerHTML.startsWith("DOING ")) {
			entry.insertAdjacentElement(
				"afterbegin",
				createCheckboxElement(false)
			)
		} else if (entry.innerHTML.startsWith("DONE ")) {
			entry.insertAdjacentElement(
				"afterbegin",
				createCheckboxElement(true)
			)
		}
	})
}

export default class LogseqPlugin extends Plugin {
	async onload() {
		console.log("Loading Loseq Compatibility Plugin...");
		this.registerMarkdownPostProcessor(EnhanceLogseqTaskStatusInPreviewMode);
	}

	async onunload() {
		console.log("Unloading Loseq Compatibility Plugin...");
	}
}
