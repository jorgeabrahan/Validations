import 'https://cdn.jsdelivr.net/gh/jorgeabrahan/Validations@3aa7478/public/dataValidation.js'

console.log('Hello world!'.isEmpty()) // should print false in console

<h1>Methods list</h1>
	<h2>Methods for strings:</h2>
	<p>Methods that return a <b>boolean</b> type:</p>
	<pre><code class="language-js">
isEmpty: () =&gt; boolean
isNumber: () =&gt; boolean
hasLenghtOf: (expectedLength: number) =&gt; boolean
hasMinLengthOf: (expectedMinLength: number) =&gt; boolean
hasMaxLengthOf: (expectedMaxLength: number) =&gt; boolean
hasLengthRangeOf: (expectedMinLength: number, expectedMaxLength: number) =&gt; boolean
hasSpaces: () =&gt; boolean
hasSpecialChars: () =&gt; boolean
hasOnlySpecialChars: () =&gt; boolean
hasNumbers: () =&gt; boolean
hasOnlyNumbers: () =&gt; boolean
hasLetters: () =&gt; boolean
hasOnlyLetters: () =&gt; boolean
hasCapitalLetters: () =&gt; boolean
hasOnlyCapitalLetters: () =&gt; boolean
hasLowerCaseLetters: () =&gt; boolean
hasOnlyLowerCaseLetters: () =&gt; boolean
hasFormat: (format: string) =&gt; boolean
hasComplexFormat: (formats: Array&lt;FormatObject&gt;) =&gt; boolean
	</code></pre>
	<p>As you saw, the <b>hasComplexFormat()</b> method receives an Array of <b>FormatObject</b> types. This is how a <b>FormatObject</b> looks like:</p>
	<pre><code class="language-js">
// this is how the FormatObject interface looks like
interface FormatObject &lbrace;
	amount: number | Array&lt;number&gt; | 'all' | 'unknown'
	criterias: string | Array&lt;string&gt;
	until?: string // only with amount:unknown
	minAmount?: number // only with amount:unknown
	maxAmount?: number // only with amount:unknown
&rbrace;
	</code></pre>
	<p>Methods that return a <b>number</b> type or an Array of <b>numbers</b>:</p>
	<pre><code class="language-js">
countOccurrences: (chars: string) =&gt; number | Array&lt;number&gt;
	</code></pre>
	<p>Methods that return a <b>string</b> type:</p>
	<pre><code class="language-js">
toSingleSpaced: () =&gt; string
removeChars: (charsToRemove: string, justOnce?: boolean) =&gt; string
removeWord: (wordToRemove: string, justOnce?: boolean) =&gt; string
removeRepeatedChars: () =&gt; string
	</code></pre>
	<h2>Methods for numbers:</h2>
	<p>Methods that return a <b>boolean</b> type:</p>
	<pre><code class="language-js">
isPositive: () =&gt; boolean
isNegative: () =&gt; boolean
isFloat: () =&gt; boolean
isZero: () =&gt; boolean
isBetween: (min: number, max: number, includeLimits?: boolean) =&gt; boolean
	</code></pre>
	<p>Methods that return a <b>[number, number]</b> type:</p>
	<pre><code class="language-js">
toFraction: (simplify?: boolean) =&gt; [number, number] // =&gt; [numerator, denominator]
	</code></pre>
