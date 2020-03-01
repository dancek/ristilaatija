// ristilaatija
// ------------------------------------------------------------------------
// Copyright 2017 Raph Levien,
//           2018 Bob Copeland,
//           2020 Hannu Hartikainen

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// (https://www.apache.org/licenses/LICENSE-2.0)

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ------------------------------------------------------------------------

module = {};
importScripts('fill.js');
onmessage = function(e) {
    let cmd = e.data;
    switch (cmd[0]) {
        case 'run':
            let words = cmd[1].split(/\n/);
            let grid = cmd[2];
            grid = grid.replace(/\./g, "#");
            grid = grid.replace(/ /g, ".");

            console.log("fill " + grid);
            let wordlist = new module.exports.wordlist(words);
            let filler = new module.exports.filler(grid, wordlist);
            let result = filler.fill();
            console.log("result: " + result);
            if (result.indexOf(".") == -1) {
              result = result.replace(/\./g, " ");
              result = result.replace(/#/g, ".");
              postMessage(["sat", result + "\n"]);
            } else {
              postMessage(["unsat"]);
            }
            break;
        case 'cancel':
            postMessage(["ack_cancel"]);
            break;
    }
}
