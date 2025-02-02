#!/usr/bin/env node
const { program } = require('commander');
const { build } = require('../lib/core');
const { spawn } = require('child_process');
const path = require('path');

program
    .version(require('../package.json').version)
    .description('NitaiFrame插件开发工具');

// build命令
program
    .command('build')
    .description('打包资源文件')
    .option('-i, --input <dir>', '输入目录', './src')
    .option('-o, --output <file>', '输出文件', './build/index.js')
    .option('--no-id', '跳过生成ID文件')
    .option('--no-manifest', '跳过生成清单文件')
    .action((options) => {
        try {
            console.log('🚀 开始打包资源...');
            const result = build({
                inputDir: options.input,
                outputFile: options.output,
                generateId: options.id,
                generateManifest: options.manifest
            });
            console.log(`✅ 打包完成，共处理 ${result.fileCount} 个文件`);
            console.log(`📂 输出路径: ${path.resolve(options.output)}`);
        } catch (err) {
            console.error('❌ 打包失败:', err.message);
            process.exit(1);
        }
    });

// dev命令
program
    .command('dev')
    .description('启动调试服务器')
    .option('-p, --port <number>', '服务器端口', '11150')
    .option('-d, --dir <path>', '服务目录', './build')
    .action((options) => {
        const serverModule = require.resolve('http-server/bin/http-server');

        const args = [
            `"${serverModule}"`,      // 模块路径
            `"${path.resolve(options.dir)}"`, // 服务目录
            '-p', options.port,       // 端口参数
            '--cors',
            '--log-ip'
        ];

        console.log(`🌐 启动调试服务器: http://localhost:${options.port}`);
        console.log(`📂 服务目录: ${path.resolve(options.dir)}`);
        console.log('🛑 使用 Ctrl+C 停止服务器\n');

        const { exec } = require('child_process');
        const command = `node ${args.join(' ')}`;

        const server = exec(command, { stdio: 'inherit' }, (err) => {
            if (err) {
                console.error('❌ 服务器启动失败:', err.message);
                process.exit(1);
            }
        });

        process.on('SIGINT', () => {
            console.log('\n🛑 正在关闭服务器...');
            server.kill();
            process.exit();
        });
    });


program.parse(process.argv);