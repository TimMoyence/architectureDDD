// import { Command } from '../commands/Command';
// import { CommandHandler } from '../commands/CommandHandler';
// import { Query } from '../queries/Query';
// import { QueryHandler } from '../queries/QueryHandler';

// export class Mediator {
//   private commandHandlers: Map<string, CommandHandler<any>> = new Map();
//   private queryHandlers: Map<string, QueryHandler<any>> = new Map();

//   registerCommandHandler(commandType: string, handler: CommandHandler<any>): void {
//     this.commandHandlers.set(commandType, handler);
//   }

//   registerQueryHandler(queryType: string, handler: QueryHandler<any>): void {
//     this.queryHandlers.set(queryType, handler);
//   }

//   async executeCommand(command: Command): Promise<void> {
//     const handler = this.commandHandlers.get(command.constructor.name);
//     if (!handler) {
//       throw new Error(`No handler found for command ${command.constructor.name}`);
//     }
//     await handler.execute(command);
//   }

//   async executeQuery<T>(query: Query): Promise<T> {
//     const handler = this.queryHandlers.get(query.constructor.name);
//     if (!handler) {
//       throw new Error(`No handler found for query ${query.constructor.name}`);
//     }
//     return await handler.execute(query);
//   }
// }
