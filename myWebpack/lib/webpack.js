const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = class webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  // 启动函数
  run() {
    const info = this.parse(this.entry);
    this.modules.push(info);

    // 递归处理模块依赖
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const dependencies = item.dependencies;
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]));
        }
      }
    }

    // 数组结构转对象结构
    const obj = {};
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      };
    });

    // 生成 bundle 文件
    this.file(obj);
  }

  // 
  parse(entryFile) {
    // 读取文件内容
    const content = fs.readFileSync(entryFile, 'utf-8');

    // 借助 babel 生成 AST
    const ast = parser.parse(content, { sourceType: 'module' });

    const dependencies = {}; // 用于保存依赖关系映射

    // 处理模块中的导入
    traverse(ast, {
      ImportDeclaration({ node }) {
        const pathName = './' + path.join(path.dirname(entryFile), node.source.value);
        dependencies[node.source.value] = pathName;
      }
    });

    // 生成模块内容
    const { code } = transformFromAst(ast, null, { presets: ['@babel/preset-env'] });

    return { entryFile, dependencies, code };
  }

  file(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    const newCode = JSON.stringify(code);
    const bundle = `(function (graph) {
      function require(module) {
        function PathRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        }
        const exports = {};
        (function (require, exports, code) {
          eval(code);
        })(PathRequire, exports, graph[module].code);

        return exports;
      }

      require('${this.entry}');
    })(${newCode})`;

    // 生成 main.js
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
};
