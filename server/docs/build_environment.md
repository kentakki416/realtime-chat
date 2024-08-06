## 環境構築の手順を簡単にメモ
1. npmプロジェクトの初期化（package.jsonの作成）
  
    `npm init -y`
    
2. Typescriptと型定義ファイルをインストール

    `npm install typescript ts-node @types/node --save-dev`

3. Typescriptの設定ファイルを作成

    `npx tsc --init`
4. tsconfig.jsonを修正

    ```json
    {
        "compilerOptions": {
            /******************** Basic Options *******************************/
            "outDir": "dist", // JSの出力対象
            "rootDir": "./src", // コンパイル対象のファイル
            "declaration": true, // .d.tsファイルを生成する
            "declarationMap": true,
            "target": "es2020", // コンパイル対象のJSのバージョン
            "module": "commonjs", // TODO:一旦スキップ
            "lib": [ // Targetの機能がデフォルト（※公式ドキュメント参照）例） "lib": ["DOM", "ES6", "DOM.Iterable", "ScriptHost"]
            "es2020"
            ],
            "allowJs": true, // JSもTSのコンパイル対象にすることができる。コンパイル後のjsを２重チェックしないように、excludeを設定する必要あり
            "checkJs": false, // コンパイルはしないがJSでも型をチェックをしてくれる　TODO coreのts化一通り完成する際にここをtrueにする
            "sourceMap": true, // ブラウザ（管理者モード）でtsファイルを表示できる
            "noEmit": false, // JSにコンパイルせずに型チェックだけを行う
            "pretty": true, // TSのエラーメッセージに色がつく
            "noEmitOnError": true, // 型チェックエラーがあれば、JSにコンパイルしない
            "skipLibCheck": true, // .d.tsによる型チェックを省略。時間短縮が目的💀危険：型定義の間違いを見逃す可能性あり
            /****************** Strict Type-Checking Options *******************/
            "strict": true,
            /****************** Additional Checks ******************************/
            "noUnusedLocals": true, //宣言はされたが、利用されていない変数を許可しない
            "noUnusedParameters": true, //宣言はされたが、利用されていない引数を許可しない
            "noImplicitReturns": true, //分岐処理全てでreturnされることを強制する
            "noFallthroughCasesInSwitch": true, //switchのcase文にbreakが必須になる
            /****************** Module Resolution Options *********************/
            "moduleResolution": "node",
            "baseUrl": ".",
            "paths": {
            "*": [
                "lib/*"
            ]
            },
            "typeRoots": [
            "./@types",
            "./node_modules/@types"
            ],
            "types": [
            "node",
            // "jest",
            ],
            "allowSyntheticDefaultImports": true,
            "preserveSymlinks": false,
            "esModuleInterop": true, // CommonJSとESモジュールの互換性を向上させるための設定
            /* Advanced Options */
            "forceConsistentCasingInFileNames": true
        },
        "include": [ //コンパイル対象
            "./src"
            // "test/util",
            // "test/cache_updater",
            // "test/service",
            // "test/pubsub",
            // "test/bigquery",
            // "test/firebase_cloud_messaging",
            // "test/http_client"
        ],
        "exclude": [ //コンパイル対象外
            "./dist/",
            "./node_modules/",
            "./test/",
        ],
    }

    ```
5. Expressをインストール

    `npm install express`
    `npm install @types/express --save-dev`
    
6. 最小のサーバーを構築

    ```ts
    import express, { Request, Response } from 'express';

    const app = express();
    const port = 3000;

    app.get('/', (_: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
    });

    app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });
    ```
6. package.jsonに実行コマンドを追加

    ```json
      "scripts": {
        "build": "rm -rf dist && tsc",
        "start": "node dist/index.js",
        "dev": "ts-node src/index.ts",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
  ```

7. サーバーを起動

    `npm run build`
    `npm run start`
