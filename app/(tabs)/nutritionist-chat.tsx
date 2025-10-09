import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Send, Bot, User } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Stack, useRouter } from 'expo-router';
import { useRorkAgent, createRorkTool } from '@rork/toolkit-sdk';
import { z } from 'zod';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function NutritionistChatScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const { messages, sendMessage, error } = useRorkAgent({
    tools: {},
    systemPrompt: `Você é um nutricionista especializado em dietas sem lactose. 
    
Seu papel é:
- Ajudar pessoas com intolerância à lactose
- Sugerir alternativas sem lactose
- Explicar sobre nutrição e cálcio
- Recomendar receitas e alimentos
- Ser empático e profissional

Sempre responda em português brasileiro de forma clara e amigável.`,
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    await sendMessage(userMessage);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const suggestions = [
    'Como substituir leite em receitas?',
    'Quais alimentos são ricos em cálcio?',
    'Receita de bolo sem lactose',
    'Alternativas ao queijo',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen
        options={{
          title: 'Nutricionista IA',
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.primary,
        }}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.botIconLarge}>
              <Bot size={48} color={Colors.primary} strokeWidth={2} />
            </View>
            <Text style={styles.emptyTitle}>Olá! Sou seu Nutricionista IA</Text>
            <Text style={styles.emptyDescription}>
              Estou aqui para ajudar com dúvidas sobre alimentação sem lactose
            </Text>

            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Perguntas sugeridas:</Text>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionChip}
                  onPress={() => {
                    setInput(suggestion);
                    handleSend();
                  }}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          messages.map((message) => (
            <View key={message.id} style={styles.messageWrapper}>
              {message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return (
                    <View
                      key={`${message.id}-${index}`}
                      style={[
                        styles.messageBubble,
                        message.role === 'user' ? styles.userBubble : styles.assistantBubble,
                      ]}
                    >
                      {message.role === 'assistant' && (
                        <View style={styles.botIcon}>
                          <Bot size={20} color={Colors.primary} strokeWidth={2} />
                        </View>
                      )}
                      <View style={styles.messageContent}>
                        <Text
                          style={[
                            styles.messageText,
                            message.role === 'user' ? styles.userText : styles.assistantText,
                          ]}
                        >
                          {part.text}
                        </Text>
                      </View>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao enviar mensagem. Tente novamente.</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua pergunta..."
          placeholderTextColor={Colors.text.tertiary}
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!input.trim()}
        >
          <Send size={20} color={Colors.surface} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 32,
  },
  botIconLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primaryLight + '30',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  emptyDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 24,
    marginBottom: 32,
  },
  suggestionsContainer: {
    width: '100%',
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.tertiary,
    marginBottom: 12,
  },
  suggestionChip: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageBubble: {
    flexDirection: 'row' as const,
    maxWidth: '85%',
    gap: 8,
  },
  userBubble: {
    alignSelf: 'flex-end' as const,
  },
  assistantBubble: {
    alignSelf: 'flex-start' as const,
  },
  botIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight + '30',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginTop: 4,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    backgroundColor: Colors.primary,
    color: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    overflow: 'hidden' as const,
  },
  assistantText: {
    backgroundColor: Colors.surface,
    color: Colors.text.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    overflow: 'hidden' as const,
  },
  errorContainer: {
    backgroundColor: Colors.error + '20',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    textAlign: 'center' as const,
  },
  inputContainer: {
    flexDirection: 'row' as const,
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
    alignItems: 'flex-end' as const,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text.primary,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
