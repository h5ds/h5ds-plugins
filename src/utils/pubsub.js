/**
 * 发布/订阅模式
 * pubsub.js 必须在require.js 之前载入
 * https://www.npmjs.com/package/PubSub
 *
 *
.subscribe(topic, callback, [once]) ⇒ number
.subscribeOnce(topic, callback) ⇒ number
.publish(topic, [...data]) ⇒ boolean
.publishSync(topic, [...data]) ⇒ boolean
.unsubscribe(topic) ⇒ boolean | string
.unsubscribeAll() ⇒ PubSub
.hasSubscribers([topic]) ⇒ boolean
.subscribers() ⇒ object
.subscribersByTopic(topic) ⇒ array
.alias(aliasMap) ⇒ PubSub
 */
import PubSub from 'PubSub';

// 只初始化一次
if (!window.pubSubWeb) {
  window.pubSubWeb = new PubSub();
}
