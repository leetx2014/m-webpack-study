
class FileListPlugin {
  apply(complier) {
    complier.hooks.emit.tapAsync('TxtWebpackPlugin', (compilation, cb) => {
      const assetsInfo = Object.keys(compilation.assets);
      const content = assetsInfo.map(asset => `filename：${asset} (size： ${compilation.assets[asset].size()})`);

      compilation.assets['fileList.txt'] = {
        source: () => `bundle⽂件的总量为: ${assetsInfo.length}\n\n详细信息：\n${content.join().replace(/,/g, '\n')}`,
        size: () => 1024
      };

      cb();
    });
  }
}

module.exports = FileListPlugin;
