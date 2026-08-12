// ==========================================
// 1. 診断結果データ（花の情報）
// ==========================================
const flowers = {
  rose: {
    name: "バラ",
    meaning: "花言葉：情熱",
    desc: "あなたは情熱的で、自分の目標に向かってまっすぐ突き進む魅力的な人です。周りを引きつける強いエネルギーを持っています。"
  },
  tulip: {
    name: "チューリップ",
    meaning: "花言葉：思いやり",
    desc: "あなたは優しく思いやりがあり、誰からも愛される親しみやすい人です。周りの人の気持ちにより添う温かさを持っています。"
  },
  lavender: {
    name: "ラベンダー",
    meaning: "花言葉：優美",
    desc: "あなたは落ち着きがあり、洗練された品のある雰囲気を持つ人です。一緒にいる人に安心感を与える癒やしの存在です。"
  },
  lily: {
    name: "ユリ",
    meaning: "花言葉：純粋",
    desc: "あなたは誠実でブレない芯を持ち、自分らしさを大切にする人です。まっすぐで美しい心を持っています。"
  }
};

// ==========================================
// 2. 質問データ（5問）
// ==========================================
const questions = [
  {
    text: "休日を過ごすなら、どんな過ごし方が理想？",
    options: [
      { text: "新しいスポットに出かけたり、アクティブに動く", target: "rose" },
      { text: "友達や大切な人と会話や食事を楽しむ", target: "tulip" },
      { text: "カフェや家で静かに読書や趣味を楽しむ", target: "lavender" },
      { text: "自分の部屋を掃除したり、身の回りを整える", target: "lily" }
    ]
  },
  {
    text: "グループで何かを決めるとき、あなたの立ち位置は？",
    options: [
      { text: "「これにしよう！」とアイデアを出して引っ張る", target: "rose" },
      { text: "みんなの意見を聞いて、まとめ役になる", target: "tulip" },
      { text: "一歩引いて、全体を静かに見守る", target: "lavender" },
      { text: "自分の意見をしっかり持って、筋を通す", target: "lily" }
    ]
  },
  {
    text: "服や小物を選ぶときの基準は？",
    options: [
      { text: "目を引く華やかなデザインや鮮やかな色", target: "rose" },
      { text: "親しみやすく、明るく見せてくれるもの", target: "tulip" },
      { text: "落ち着いた色合いで、大人っぽいもの", target: "lavender" },
      { text: "シンプルで洗練された、上質なもの", target: "lily" }
    ]
  },
  {
    text: "壁にぶつかったとき、どうやって乗り越える？",
    options: [
      { text: "気合いと行動力で正面から突破する！", target: "rose" },
      { text: "信頼できる人に相談してアドバイスをもらう", target: "tulip" },
      { text: "一度冷静になって、時間をかけて対処法を考える", target: "lavender" },
      { text: "自分の信念を信じて、コツコツ努力を続ける", target: "lily" }
    ]
  },
  {
    text: "人から褒められたら一番うれしい言葉は？",
    options: [
      { text: "「行動力があるね！」", target: "rose" },
      { text: "「一緒にいると楽しい！」", target: "tulip" },
      { text: "「一緒にいると落ち着くよ」", target: "lavender" },
      { text: "「しっかり者だね！」", target: "lily" }
    ]
  }
];

// ==========================================
// 3. 状態を記憶する変数
// ==========================================
let currentQuestionIndex = 0; // 今何問目か（0 = 第1問）
let scores = {
  rose: 0,
  tulip: 0,
  lavender: 0,
  lily: 0
};

// ==========================================
// 4. HTML要素の取得
// ==========================================
// 画面（スクリーン）の要素
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// ボタンの要素
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// 質問画面の中身
const questionNumberEl = document.getElementById("quiz-number");
const questionTextEl = document.getElementById("quiz-text");
const optionsContainerEl = document.getElementById("options-container");

// 結果画面の中身
const flowerNameEl = document.getElementById("flower-name");
const flowerMeaningEl = document.getElementById("flower-meaning");
const flowerDescEl = document.getElementById("flower-desc");

const tweetArea = document.getElementById("tweet-area");

// ==========================================
// 5. イベントと処理（関数の定義）
// ==========================================

// --- 診断スタート ---
startBtn.addEventListener("click", () => {
  // スタート画面を隠し、質問画面を表示する
  startScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  
  // 質問画面をセットアップ（第1問を表示）
  showQuestion();
});

// --- 質問を表示する処理 ---
function showQuestion() {
  // 今の質問データを取得
  const q = questions[currentQuestionIndex];
  
  // 質問番号と質問文を書き換え（currentQuestionIndexは0から始まるので+1する）
  questionNumberEl.textContent = `第 ${currentQuestionIndex + 1} 問`;
  questionTextEl.textContent = q.text;
  
  // 前の質問の選択肢ボタンを一度リセット
  optionsContainerEl.innerHTML = "";
  
  // 選択肢ボタンを作成
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = option.text;
    
    // 選択肢がクリックされたときの処理
    btn.addEventListener("click", () => {
      selectOption(option.target);
    });
    
    // コンテナにボタンを追加
    optionsContainerEl.appendChild(btn);
  });
}

// --- 選択肢が選ばれたときの処理 ---
function selectOption(targetFlower) {
  // 選ばれた花のスコアを +1
  scores[targetFlower]++;
  
  // 次の質問に進む
  currentQuestionIndex++;
  
  // まだ質問が残っていれば次の質問を表示、終わっていれば結果を表示
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// --- 結果画面を表示する処理 ---
function showResult() {
  // 質問画面を隠し、結果画面を表示
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");
  
  // 一番得点が高かった花を判定する
  let highestScore = -1;
  let resultFlowerKey = "";
  
  for (const flowerKey in scores) {
    if (scores[flowerKey] > highestScore) {
      highestScore = scores[flowerKey];
      resultFlowerKey = flowerKey;
    }
  }
  
  // 結果データを取得して画面に反映
  const result = flowers[resultFlowerKey];
  flowerNameEl.textContent = result.name;
  flowerMeaningEl.textContent = result.meaning;
  flowerDescEl.textContent = result.desc;

  // ツイートエリアの作成
  tweetArea.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue = 
    "https://x.com/intent/tweet?button_hashtag=" +
    encodeURIComponent('あなたに似合う花') +
    "&ref_src=twsrc%5Etfw";

  const shareText = `私に似合う花は【${result.name}】でした！ (${result.meaning})`;

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', shareText);
  anchor.innerText = 'Post #あなたに似合う花診断';

  tweetArea.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetArea.appendChild(script);
}

// --- リスタート（もう一度診断する） ---
restartBtn.addEventListener("click", () => {
  // 変数を初期状態（0）に戻す
  currentQuestionIndex = 0;
  scores = { rose: 0, tulip: 0, lavender: 0, lily: 0 };

  tweetArea.innerText = '';
  
  // 結果画面を隠し、スタート画面を表示
  resultScreen.classList.add("hide");
  startScreen.classList.remove("hide");
});

// ==========================================
// 6. デバッグ・テスト用関数
// ==========================================

/**
 * 診断ロジックのテストを実行する関数
 * @param {Array<string>} choices - 5問分の回答ターゲット配列（例: ["rose", "rose", "rose", "rose", "rose"]）
 */
function testDiagnosis(choices) {
  console.log("--- 🧪 診断テスト開始 ---");

  // 入力チェック（5問分の回答があるか）
  if (!choices || choices.length !== 5) {
    console.error("❌ エラー: 5問分の回答（配列）を指定してください。例: ['rose', 'tulip', 'rose', 'lavender', 'lily']");
    return;
  }

  // 1. 変数をリセット
  currentQuestionIndex = 0;
  scores = { rose: 0, tulip: 0, lavender: 0, lily: 0 };

  // 2. 指定された選択肢を順に模擬回答
  choices.forEach((target, index) => {
    console.log(`第 ${index + 1} 問: ${target} を選択`);
    selectOption(target);
  });

  // 3. 判定結果のログ確認
  console.log("📊 最終スコア分布:", scores);
  console.log(`🌸 表示された結果: ${flowerNameEl.textContent}`);
  console.log("--- 診断テスト完了 ---");
}

/**
 * 全種類（4つの花）が正しく出力されるか一括検証する関数
 */
function testAllResults() {
  console.log("🧪 全パターン自動テスト（全4種類）を開始します");

  const testCases = [
    { target: "rose", name: "バラ（全問バラ）" },
    { target: "tulip", name: "チューリップ（全問チューリップ）" },
    { target: "lavender", name: "ラベンダー（全問ラベンダー）" },
    { target: "lily", name: "ユリ（全問ユリ）" }
  ];

  testCases.forEach(c => {
    console.log(`\n【テスト対象: ${c.name}】`);
    // 指定した花を5回選ぶ配列を作成して実行
    const answers = Array(5).fill(c.target);
    testDiagnosis(answers);
  });
}