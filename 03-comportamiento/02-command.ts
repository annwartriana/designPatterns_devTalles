/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */


import { COLORS } from '../helpers/colors.ts';
// Paso 1: Definir la interfaz Command
// Command: Interfaz común para todos los comandos
interface Command {
  execute(): void;
}
// Paso 2: Crear los receptores (Receivers)
// Los receptores contienen la lógica para realizar acciones específicas.
// Receiver: Clase que realiza las acciones reales
class Light {
  turnOn(): void {
    console.log("%cLa luz está encendida", COLORS.yellow);
  }

  turnOff(): void {
    console.log("%cLa luz está apagada", COLORS.yellow);
  }
}

class Fan {
  on(): void {
    console.log("%cEl ventilador está encendido", COLORS.green);
  }

  off(): void {
    console.log("%cEl ventilador está apagado", COLORS.green);
  }
}
// Paso 3: Crear los comandos concretos
// Cada comando concreto encapsula una acción específica sobre un receptor.
// ConcreteCommand: Encapsula la acción de encender/apagar la luz
class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.off();
  }
}

// Paso 4: Crear el invocador (Invoker)
// El invocador mantiene referencias a los comandos y solicita su ejecución.
// Invoker: El control remoto
class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command) {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }
    console.log("%cNo se ha asignado un comando a ese botón", COLORS.red);
  }
}

// Paso 5: Uso del patrón Command
// Cliente
function main() {
  const remoteControl = new RemoteControl();
  const light = new Light();
  const fan = new Fan();

  // Crear los comandos para los dispositivos
  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);

  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  // Asignar las acciones al el control remoto
  remoteControl.setCommand("1", lightOnCommand);
  remoteControl.setCommand("2", lightOffCommand);
  remoteControl.setCommand("3", fanOnCommand);
  remoteControl.setCommand("4", fanOffCommand);

  let continueProgram = true;

  do {
    console.clear();
    const pressedButton =
      prompt(
        `Presiona un botón del control:
          1. Encender luz
          2. Apagar luz
          3. Encender ventilador
          4. Apagar ventilador
  
          Botón: 
        `
      ) ?? "";

    remoteControl.pressButton(pressedButton);

    const continueProgramResponse = prompt(
      `\n¿Deseas continuar? (y/n):`
    )?.toLowerCase();

    continueProgram = continueProgramResponse === "n" ? false : true;
  } while (continueProgram);
}

main();
