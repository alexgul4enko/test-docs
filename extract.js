const { extractMessagesFromGlob, parseGlob, toPot, outputPot } = require('react-gettext-parser');
const { spawnSync } = require('child_process');

const fs = require('fs');
const messages = extractMessagesFromGlob(['src/**/{*.js,*.jsx,*.ts,*.tsx}'], {
  funcArgumentsMap: {
    gettext: ['msgid'],
    pgettext: ['msgctxt', 'msgid'],
    ngettext: ['msgid', 'msgid_plural'],
    npgettext: ['msgctxt', 'msgid_plural', 'msgid']
  }
});

const msg = messages.reduce((res, msg) => {
  const transl = msg.msgid_plural
    ? {
        [msg.msgid]: msg.msgctxt || msg.msgid,
        [`${msg.msgid}_other`]: msg.msgid_plural
      }
    : {
        [msg.msgid]: msg.msgctxt || msg.msgid
      };
  return {
    ...res,
    ...transl
  };
}, {});

fs.writeFileSync('./translations.json', JSON.stringify(msg, null, 2));

spawnSync('npx', ['crowdin', 'upload', 'sources'], { stdio: 'inherit' });
