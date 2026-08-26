import {
  BaseRpcClient,
  createMessageConnection,
  Emitter,
  urlBuilder,
  type Connection,
  type Disposable,
  type MessageConnection
} from '@axonivy/jsonrpc';
import type {
  EditorFileContent,
  Event,
  RuleClient,
  RuleContext,
  RuleEditorData,
  RuleOnNotificationTypes,
  RuleRequestTypes,
  RuleSaveDataArgs
} from '@axonivy/rule-editor-protocol';

export class RuleClientJsonRpc extends BaseRpcClient implements RuleClient {
  protected onDataChangedEmitter = new Emitter<void>();
  protected onValidaitonChangedEmitter = new Emitter<void>();
  onDataChanged: Event<void> = this.onDataChangedEmitter.event;
  onValidationChanged: Event<void> = this.onValidaitonChangedEmitter.event;

  protected override setupConnection(): void {
    super.setupConnection();
    this.toDispose.push(this.onDataChangedEmitter);
    this.toDispose.push(this.onValidaitonChangedEmitter);
    this.onNotification('dataChanged', data => {
      this.onDataChangedEmitter.fire(data);
    });
    this.onNotification('validationChanged', data => {
      this.onValidaitonChangedEmitter.fire(data);
    });
  }

  initialize(context: RuleContext): Promise<void> {
    return this.sendRequest('initialize', { ...context });
  }

  data(context: RuleContext): Promise<RuleEditorData> {
    return this.sendRequest('data', { ...context });
  }

  saveData(saveData: RuleSaveDataArgs): Promise<EditorFileContent> {
    return this.sendRequest('saveData', { ...saveData });
  }

  sendRequest<K extends keyof RuleRequestTypes>(command: K, args?: RuleRequestTypes[K][0]): Promise<RuleRequestTypes[K][1]> {
    return args === undefined ? this.connection.sendRequest(command) : this.connection.sendRequest(command, args);
  }

  onNotification<K extends keyof RuleOnNotificationTypes>(kind: K, listener: (args: RuleOnNotificationTypes[K]) => unknown): Disposable {
    return this.connection.onNotification(kind, listener);
  }

  public static webSocketUrl(url: string) {
    return urlBuilder(url, 'ivy-rule-lsp');
  }

  public static async startClient(connection: Connection): Promise<RuleClientJsonRpc> {
    return this.startMessageClient(createMessageConnection(connection.reader, connection.writer));
  }

  public static async startMessageClient(connection: MessageConnection): Promise<RuleClientJsonRpc> {
    const client = new RuleClientJsonRpc(connection);
    await client.start();
    return client;
  }
}
