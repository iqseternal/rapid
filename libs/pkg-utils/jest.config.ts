import type { Config } from 'jest';

export default async (): Promise<Config> => {


  return {
    transform: {
      "^.+.tsx?$": ["ts-jest",{}],
    },

    // 定义全局变量
    globals: {

    },

    // 自动模拟测试, 指示是否应在运行期间报告每个单独的测试
    verbose: true,

    // 0: 运行所有测试, 1: 遇到错误时停止
    bail: 1,

    // 是否收集测试时的覆盖率信息, 测试执行速度被明显减慢
    collectCoverage: true,

    // Jest 在撰写报道报告时使用的报告者姓名列表
    coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],

    // 本测试展示的项目名
    displayName: 'pkg-utils',

    // 使调用已弃用的 API 会引发有用的错误消息。
    errorOnDeprecated: true,

    // 将 Jest 的全局变量（expect、test、describe等）插入到全局环境中
    injectGlobals: true,

    // 一个数字，用于限制使用 时允许同时运行的测试数。
    maxConcurrency: 5,

    // 设定运行测试的最大工作池数目。在单次运行模式下，默认为计算机上可用的内核数减去主线程的 1。
    // maxWorkers: '50%',

    // 模块使用的文件扩展名数组。如果你需要模块而没有指定文件扩展名，这些是 Jest 将按照从左到右的顺序查找的扩展。
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

    // 打印一条警告，指示如果 Jest 在完成后的这个毫秒数内没有干净地退出，则可能存在打开的句柄。
    openHandlesTimeout: 1000,

    // 用作 Jest 配置基础的预设。
    preset: 'ts-jest',


    // 当配置提供一组路径或glob模式时，Jest将同时在所有指定的项目中运行测试。
    // projects: ['<rootDir>', '<rootDir>/examples/*'],
    // projects: [],

    // 用于随机化文件中测试的顺序
    randomize: true,

    // 默认情况下，每个测试文件都有其自己的独立模块注册表, 这对于隔离每个测试的模块非常有用，这样本地模块状态就不会在测试之间发生冲突
    resetModules: false,

    // 包含 Jest 配置文件的目录的根目录
    // rootDir: '<rootDir>',

    // 用于在测试报告摘要中打印种子。
    showSeed: true,

    // 测试被视为慢速并在结果中报告的秒数。
    // slowTestThreshold: 0.1,

    // 测试环境
    testEnvironment: 'node',

    // 测试失败时，Jest 返回退出代码。
    testFailureExitCode: 1,

    // Jest 用来检测测试文件的 glob 模式
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],

    // 如果测试路径与任何模式匹配，则将跳过该路径。
    testPathIgnorePatterns: [
      "/node_modules/"
    ],

    // 测试超时时间
    testTimeout: 10000,


    // 是否使用工作线程进行并行化。默认情况下使用子进程。使用工作线程可能有助于提高性能。
    // workerThreads: true,
  } as Config;
};
