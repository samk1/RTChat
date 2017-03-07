/**
 * Created by samk on 23/02/2017.
 */
import Ber from './Writer';
import Tags from './Tags';

const tagRTChatClientMessage = 48;

function encode(clientMessage) {
  const writer = new Ber.Writer();
  writer.startSequence();
  writer.writeString(clientMessage.txTime, 0);
  writer.writeString(clientMessage.username, 1);
  writer.writeBuffer(clientMessage.userSecret, 2);
  writer.writeInt(clientMessage.seq, 3);
  encodeSentence(writer, clientMessage.sentence, 4);
  writer.endSequence();

  return writer.buffer;
}

function getWordTag(word) {
  if(word.tag === Tags.RTChatSleep) {
   return 0;
  }
  else if (word.tag === Tags.RTChatCharCode) {
    return 1;
  }
  else {
    console.log('unrecognised word tag:' + word.tag);
    return null;
  }
}

function encodeSentence(writer, sentence, tag) {
  sentence.forEach(function (word) {
    const tag = getWordTag(word);

    if(tag === null) {
      throw new Error('tag is null')
    }

    writer.writeInt(word.value, tag);
  })
}