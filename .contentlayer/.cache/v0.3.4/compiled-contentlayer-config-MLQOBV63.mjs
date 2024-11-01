// contentlayer.config.ts
import * as fs from "node:fs/promises";
import path from "node:path";
import { defineDocumentType, makeSource } from "@contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkComment from "remark-comment";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import strip from "strip-markdown";
import { unified } from "unified";
var CONTENT_DIR_PATH = "src/docs";
var article = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: "src/docs/**/*.md",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true }
  },
  computedFields: {
    slug: {
      // @ts-expect-error TODO
      type: "string[]",
      resolve: (doc) => doc._raw.flattenedPath.replace("docs/", "").split("/")
    },
    url: {
      type: "string",
      resolve: (doc) => "/" + doc._raw.flattenedPath
    },
    pathSegments: {
      // @ts-expect-error TODO
      type: "{ order: number; pathName: string }[]",
      resolve: (doc) => getPathSegments(doc._raw.flattenedPath)
    }
  }
}));
function getPathSegments(filePath) {
  return filePath.split("/").map((fileName) => {
    const re = /^((\d+)-)?(.*)$/;
    const [, , orderStr, pathName] = fileName.match(re) ?? [];
    const order = orderStr ? parseInt(orderStr) : 0;
    return { order, pathName };
  });
}
var contentlayer_config_default = makeSource({
  onMissingOrIncompatibleData: "fail",
  contentDirPath: CONTENT_DIR_PATH,
  contentDirInclude: ["docs"],
  documentTypes: [article],
  mdx: {
    remarkPlugins: [
      // note: https://github.com/mdx-js/mdx/issues/1042#issuecomment-1027059063
      remarkComment,
      remarkGfm,
      remarkDirective
      // [remarkMessageControl, { name: 'hello' }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        // @ts-expect-error TODO
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false
        }
      ]
    ]
  },
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug]
  },
  onSuccess: async (importData) => {
    const { allDocuments } = await importData();
    const index = [];
    for (const doc of allDocuments) {
      const processor = unified().use(remarkParse).use(remarkMdx).use(strip, {
        keep: ["heading"]
      }).use(remarkGfm);
      const tree = await processor.parse(doc.body.raw);
      const file = await new Promise((resolve) => {
        processor.run(tree, (_error, _tree, file2) => {
          resolve(file2);
        });
      });
      if (doc._raw.sourceFileName === "index.md") {
        continue;
      }
      index.push({
        title: doc.title,
        path: "/" + doc._raw.flattenedPath,
        content: file.data["index"]
      });
    }
    const filePath = path.resolve("./.contentlayer/en.json");
    fs.writeFile(filePath, JSON.stringify(index));
  }
});
export {
  article,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-MLQOBV63.mjs.map
